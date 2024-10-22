import { InvalidationContext, LayoutInfo, Rect } from '@react-stately/virtualizer'
import { LayoutNode, ListLayout, ListLayoutOptions } from '@react-stately/layout'
import { Node } from '@meshx/mxui-core'

interface ListBoxLayoutProps {
    isLoading?: boolean
}

interface ListBoxLayoutOptions extends ListLayoutOptions {
    placeholderHeight: number
    padding: number
}

export class ListBoxLayout<T> extends ListLayout<T, ListBoxLayoutProps> {
    private isLoading = false
    private placeholderHeight: number
    private padding: number

    constructor(opts: ListBoxLayoutOptions) {
        super(opts)
        this.placeholderHeight = opts.placeholderHeight
        this.padding = opts.padding
    }

    update(invalidationContext: InvalidationContext<ListBoxLayoutProps>): void {
        this.isLoading = invalidationContext.layoutOptions?.isLoading || false
        super.update(invalidationContext)
    }

    protected buildCollection(): LayoutNode[] {
        const nodes = super.buildCollection(this.padding)
        let y = this.contentSize.height

        if (this.isLoading) {
            const rect = new Rect(0, y, this.virtualizer.visibleRect.width, 40)
            const loader = new LayoutInfo('loader', 'loader', rect)
            const node = {
                layoutInfo: loader,
                validRect: loader.rect
            }
            nodes.push(node)
            this.layoutNodes.set(loader.key, node)
            y = loader.rect.maxY
        }

        if (nodes.length === 0) {
            const rect = new Rect(
                0,
                y,
                this.virtualizer.visibleRect.width,
                this.placeholderHeight ?? this.virtualizer.visibleRect.height
            )
            const placeholder = new LayoutInfo('placeholder', 'placeholder', rect)
            const node = {
                layoutInfo: placeholder,
                validRect: placeholder.rect
            }
            nodes.push(node)
            this.layoutNodes.set(placeholder.key, node)
            y = placeholder.rect.maxY
        }

        this.contentSize.height = y + this.padding
        return nodes
    }

    protected buildSection(node: Node<T>, x: number, y: number): LayoutNode {
        // Synthesize a collection node for the header.
        const headerNode = {
            type: 'header',
            key: node.key + ':header',
            parentKey: node.key,
            value: null,
            level: node.level,
            hasChildNodes: false,
            childNodes: [],
            rendered: node.rendered,
            textValue: node.textValue
        }

        // Build layout node for it and adjust y offset of section children.
        const header = this.buildSectionHeader(headerNode, x, y)
        header.node = headerNode
        header.layoutInfo.parentKey = node.key
        this.layoutNodes.set(headerNode.key, header)
        y += header.layoutInfo.rect.height

        const section = super.buildSection(node, x, y)
        section.children!.unshift(header)
        return section
    }
}
