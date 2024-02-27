import { PluginOption } from 'vite'  
import autoImport from './auto-import' 
import components from './components'

export default function createVitePlugins() {
	let vitePlugins:PluginOption[] = [ 
		autoImport(),
		components()
	] 
	return vitePlugins
}