import { i18n } from "../../i18n";
const NotFound = ({ cfg }) => {
    return (<article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
    </article>);
};
export default (() => NotFound);
