import { QUARTZ, joinSegments } from "../../util/path";
import fs from "fs";
import { glob } from "../../util/glob";
import DepGraph from "../../depgraph";
export const Static = () => ({
    name: "Static",
    getQuartzComponents() {
        return [];
    },
    async getDependencyGraph({ argv, cfg }, _content, _resources) {
        const graph = new DepGraph();
        const staticPath = joinSegments(QUARTZ, "static");
        const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns);
        for (const fp of fps) {
            graph.addEdge(joinSegments("static", fp), joinSegments(argv.output, "static", fp));
        }
        return graph;
    },
    async emit({ argv, cfg }, _content, _resources) {
        const staticPath = joinSegments(QUARTZ, "static");
        const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns);
        await fs.promises.cp(staticPath, joinSegments(argv.output, "static"), {
            recursive: true,
            dereference: true,
        });
        return fps.map((fp) => joinSegments(argv.output, "static", fp));
    },
});
