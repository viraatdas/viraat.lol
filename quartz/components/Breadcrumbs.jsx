import breadcrumbsStyle from "./styles/breadcrumbs.scss";
import { joinSegments, resolveRelative } from "../util/path";
import { classNames } from "../util/lang";
const defaultOptions = {
    spacerSymbol: "❯",
    rootName: "Home",
    resolveFrontmatterTitle: true,
    hideOnRoot: true,
    showCurrentPage: true,
};
function formatCrumb(displayName, baseSlug, currentSlug) {
    return {
        displayName: displayName.replaceAll("-", " "),
        path: resolveRelative(baseSlug, currentSlug),
    };
}
export default ((opts) => {
    // Merge options with defaults
    const options = { ...defaultOptions, ...opts };
    // computed index of folder name to its associated file data
    let folderIndex;
    const Breadcrumbs = ({ fileData, allFiles, displayClass, }) => {
        // Hide crumbs on root if enabled
        if (options.hideOnRoot && fileData.slug === "index") {
            return <></>;
        }
        // Format entry for root element
        const firstEntry = formatCrumb(options.rootName, fileData.slug, "/");
        const crumbs = [firstEntry];
        if (!folderIndex && options.resolveFrontmatterTitle) {
            folderIndex = new Map();
            // construct the index for the first time
            for (const file of allFiles) {
                const folderParts = file.slug?.split("/");
                if (folderParts?.at(-1) === "index") {
                    folderIndex.set(folderParts.slice(0, -1).join("/"), file);
                }
            }
        }
        // Split slug into hierarchy/parts
        const slugParts = fileData.slug?.split("/");
        if (slugParts) {
            // is tag breadcrumb?
            const isTagPath = slugParts[0] === "tags";
            // full path until current part
            let currentPath = "";
            for (let i = 0; i < slugParts.length - 1; i++) {
                let curPathSegment = slugParts[i];
                // Try to resolve frontmatter folder title
                const currentFile = folderIndex?.get(slugParts.slice(0, i + 1).join("/"));
                if (currentFile) {
                    const title = currentFile.frontmatter.title;
                    if (title !== "index") {
                        curPathSegment = title;
                    }
                }
                // Add current slug to full path
                currentPath = joinSegments(currentPath, slugParts[i]);
                const includeTrailingSlash = !isTagPath || i < 1;
                // Format and add current crumb
                const crumb = formatCrumb(curPathSegment, fileData.slug, (currentPath + (includeTrailingSlash ? "/" : "")));
                crumbs.push(crumb);
            }
            // Add current file to crumb (can directly use frontmatter title)
            if (options.showCurrentPage && slugParts.at(-1) !== "index") {
                crumbs.push({
                    displayName: fileData.frontmatter.title,
                    path: "",
                });
            }
        }
        return (<nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (<div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>))}
      </nav>);
    };
    Breadcrumbs.css = breadcrumbsStyle;
    return Breadcrumbs;
});
