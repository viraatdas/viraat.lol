// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline";
import clipboardStyle from "./styles/clipboard.scss";
const Body = ({ children }) => {
    return <div id="quartz-body">{children}</div>;
};
Body.afterDOMLoaded = clipboardScript;
Body.css = clipboardStyle;
export default (() => Body);
