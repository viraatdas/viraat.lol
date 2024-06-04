import legacyStyle from "./styles/legacyToc.scss";
import modernStyle from "./styles/toc.scss";
import { classNames } from "../util/lang";
// @ts-ignore
import script from "./scripts/toc.inline";
import { i18n } from "../i18n";
const defaultOptions = {
    layout: "modern",
};
const TableOfContents = ({ fileData, displayClass, cfg, }) => {
    if (!fileData.toc) {
        return null;
    }
    return (<div class={classNames(displayClass, "toc")}>
      <button type="button" id="toc" class={fileData.collapseToc ? "collapsed" : ""}>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fold">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="toc-content">
        <ul class="overflow">
          {fileData.toc.map((tocEntry) => (<li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {tocEntry.text}
              </a>
            </li>))}
        </ul>
      </div>
    </div>);
};
TableOfContents.css = modernStyle;
TableOfContents.afterDOMLoaded = script;
const LegacyTableOfContents = ({ fileData, cfg }) => {
    if (!fileData.toc) {
        return null;
    }
    return (<details id="toc" open={!fileData.collapseToc}>
      <summary>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
      </summary>
      <ul>
        {fileData.toc.map((tocEntry) => (<li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
            <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
              {tocEntry.text}
            </a>
          </li>))}
      </ul>
    </details>);
};
LegacyTableOfContents.css = legacyStyle;
export default ((opts) => {
    const layout = opts?.layout ?? defaultOptions.layout;
    return layout === "modern" ? TableOfContents : LegacyTableOfContents;
});
