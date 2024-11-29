export default ((component) => {
    if (component) {
        const Component = component;
        const DesktopOnly = (props) => {
            return <Component displayClass="desktop-only" {...props}/>;
        };
        DesktopOnly.displayName = component.displayName;
        DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded;
        DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded;
        DesktopOnly.css = component?.css;
        return DesktopOnly;
    }
    else {
        return () => <></>;
    }
});
