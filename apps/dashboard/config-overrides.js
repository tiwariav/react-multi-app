const { removeModuleScopePlugin, override } = require("customize-cra");
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

// removeModuleScopePlugin is only requried with yarn v2 where Plug n Play is
// the default installation mode.
// Due to PnP, yarn workspaces do not create links in local node_modules directories
// of each package, which raises the error due to CRA implementing the ModuleScopePlugin

module.exports = override(removeModuleScopePlugin(), rewireYarnWorkspaces);
