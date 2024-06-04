export default ((component) => {
    if (component) {
        const Component = component;
        const MobileOnly = (props) => {
            return <Component displayClass="mobile-only" {...props}/>;
        };
        MobileOnly.displayName = component.displayName;
        MobileOnly.afterDOMLoaded = component?.afterDOMLoaded;
        MobileOnly.beforeDOMLoaded = component?.beforeDOMLoaded;
        MobileOnly.css = component?.css;
        return MobileOnly;
    }
    else {
        return () => <></>;
    }
});
