const windowsSwitch = '--use-react-native-windows';

module.exports = {
  project: {
    windows: {
      sourceDir: './windows',
      solutionFile: 'ClipboardExample.sln',
      project: {
        projectFile: 'ClipboardExample/ClipboardExample.vcxproj',
      },
    },
  },
}
