import { loadYaml } from '$lib/utils/yaml';
import {
	leadSchema,
	projectSchema,
	playgroundSchema,
	aboutSchema,
	contactSchema
} from '$lib/schemas/home';

export function load() {
	return {
		lead: loadYaml('src/lib/data/lead.yaml', leadSchema),
		prism: loadYaml('src/lib/data/prism.yaml', projectSchema),
		origon: loadYaml('src/lib/data/origon.yaml', projectSchema),
		rhythm: loadYaml('src/lib/data/rhythm.yaml', projectSchema),
		tribeCommunication: loadYaml('src/lib/data/tribe-communication.yaml', projectSchema),
		tribeDocuments: loadYaml('src/lib/data/tribe-documents.yaml', projectSchema),
		samespace: loadYaml('src/lib/data/samespace.yaml', projectSchema),
		taxGermany: loadYaml('src/lib/data/tax-germany.yaml', projectSchema),
		tlkn: loadYaml('src/lib/data/tlkn.yaml', projectSchema),
		playground: loadYaml('src/lib/data/playground.yaml', playgroundSchema),
		about: loadYaml('src/lib/data/about.yaml', aboutSchema),
		contact: loadYaml('src/lib/data/contact.yaml', contactSchema),
	};
}
