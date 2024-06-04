import { classNames } from "../util/lang";
function Spacer({ displayClass }) {
    return <div class={classNames(displayClass, "spacer")}></div>;
}
export default (() => Spacer);
