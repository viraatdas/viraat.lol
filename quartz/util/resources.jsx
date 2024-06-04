import { randomUUID } from "crypto";
export function JSResourceToScriptElement(resource, preserve) {
    const scriptType = resource.moduleType ?? "application/javascript";
    const spaPreserve = preserve ?? resource.spaPreserve;
    if (resource.contentType === "external") {
        return (<script key={resource.src} src={resource.src} type={scriptType} spa-preserve={spaPreserve}/>);
    }
    else {
        const content = resource.script;
        return (<script key={randomUUID()} type={scriptType} spa-preserve={spaPreserve} dangerouslySetInnerHTML={{ __html: content }}></script>);
    }
}
