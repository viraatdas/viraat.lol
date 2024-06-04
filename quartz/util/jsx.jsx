import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
import { trace } from "./trace";
const customComponents = {
    table: (props) => (<div class="table-container">
      <table {...props}/>
    </div>),
};
export function htmlToJsx(fp, tree) {
    try {
        return toJsxRuntime(tree, {
            Fragment,
            jsx: jsx,
            jsxs: jsxs,
            elementAttributeNameCase: "html",
            components: customComponents,
        });
    }
    catch (e) {
        trace(`Failed to parse Markdown in \`${fp}\` into JSX`, e);
    }
}
