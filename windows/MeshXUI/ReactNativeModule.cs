using System;
using Microsoft.ReactNative.Managed;

namespace MeshXUI
{
    [ReactModule("MeshXUI")]
    internal sealed class ReactNativeModule
    {
        // See https://microsoft.github.io/react-native-windows/docs/native-modules for details on writing native modules

        private ReactContext _reactContext;

        [ReactInitializer]
        public void Initialize(ReactContext reactContext)
        {
            _reactContext = reactContext;
        }

        [ReactMethod]
        public void sampleMethod(string stringArgument, int numberArgument, Action<string> callback)
        {
            // TODO: Implement some actually useful functionality
            callback("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
        }
    }
}
