const plugins = {};

plugins.list = [
    'api','hub','bungee', 'beaconcatch', 'runningtime', 'theblock', 'warjump'
]


plugins.isSupported = (plugin) => {
    return plugins.list.includes(plugin.toLowerCase())
}


export default plugins;