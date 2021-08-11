using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

// The User Control item template is documented at https://go.microsoft.com/fwlink/?LinkId=234236

namespace MeshXUI
{
    public sealed partial class ControlGraphics : UserControl
    {
        public ControlGraphics()
        {
            InitializeComponent();
        }

        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }

        internal static DependencyProperty TitleProperty { get; } = DependencyProperty.Register("Title", typeof(string), typeof(ControlGraphics), new PropertyMetadata(string.Empty));
    }
}
