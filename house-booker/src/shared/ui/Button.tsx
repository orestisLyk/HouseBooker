import type { ButtonProps } from "../types";

const Button = ({
    label,
    onClick,
    disabled = false,
    addClasses = ""
}: ButtonProps) => {

    return (
        <>
            <button className={"bg-accent p-2 rounded-lg hover:shadow-2xl" + addClasses} disabled={disabled} onClick={onClick}>
                {label}
            </button>
        </>
    )
}
export default Button;