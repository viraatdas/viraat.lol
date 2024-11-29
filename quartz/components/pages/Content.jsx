import { htmlToJsx } from "../../util/jsx";
const Content = ({ fileData, tree }) => {
    const content = htmlToJsx(fileData.filePath, tree);
    const classes = fileData.frontmatter?.cssclasses ?? [];
    const classString = ["popover-hint", ...classes].join(" ");
    return <article class={classString}>{content}</article>;
};
export default (() => Content);
