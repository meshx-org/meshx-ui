using Microsoft.ReactNative.Managed;

namespace MeshXUI
{
    internal class ControlGraphicsViewManager : AttributedViewManager<ControlGraphics>
    {
        [ViewManagerProperty("label")]
        public void SetLabel(ControlGraphics view, string value)
        {
            if (null != value)
            {
                view.Title = value;
            }
            else
            {
                view.ClearValue(ControlGraphics.TitleProperty);
            }
        }
    }
}
