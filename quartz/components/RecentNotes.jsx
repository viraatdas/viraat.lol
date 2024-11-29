import { resolveRelative } from "../util/path";
import { byDateAndAlphabetical } from "./PageList";
import style from "./styles/recentNotes.scss";
import { Date, getDate } from "./Date";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";
const defaultOptions = (cfg) => ({
    limit: 3,
    linkToMore: false,
    filter: () => true,
    sort: byDateAndAlphabetical(cfg),
});
export default ((userOpts) => {
    const RecentNotes = ({ allFiles, fileData, displayClass, cfg, }) => {
        const opts = { ...defaultOptions(cfg), ...userOpts };
        const pages = allFiles.filter(opts.filter).sort(opts.sort);
        const remaining = Math.max(0, pages.length - opts.limit);
        return (<div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
                const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title;
                const tags = page.frontmatter?.tags ?? [];
                return (<li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <h3>
                      <a href={resolveRelative(fileData.slug, page.slug)} class="internal">
                        {title}
                      </a>
                    </h3>
                  </div>
                  {page.dates && (<p class="meta">
                      <Date date={getDate(cfg, page)} locale={cfg.locale}/>
                    </p>)}
                  <ul class="tags">
                    {tags.map((tag) => (<li>
                        <a class="internal tag-link" href={resolveRelative(fileData.slug, `tags/${tag}`)}>
                          {tag}
                        </a>
                      </li>))}
                  </ul>
                </div>
              </li>);
            })}
        </ul>
        {opts.linkToMore && remaining > 0 && (<p>
            <a href={resolveRelative(fileData.slug, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>)}
      </div>);
    };
    RecentNotes.css = style;
    return RecentNotes;
});
