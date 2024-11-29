import style from "./styles/footer.scss";
import { version } from "../../package.json";
import { i18n } from "../i18n";
export default ((opts) => {
    const Footer = ({ displayClass, cfg }) => {
        const year = new Date().getFullYear();
        const links = opts?.links ?? [];
        return (<footer class={`${displayClass ?? ""}`}>
        <hr />
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (<li>
              <a href={link}>{text}</a>
            </li>))}
        </ul>
      </footer>);
    };
    Footer.css = style;
    return Footer;
});
