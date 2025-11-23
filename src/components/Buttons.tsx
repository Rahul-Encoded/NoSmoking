import { Button } from "./ui/button";

export default function Buttons() {
    return (
        <div className="flex justify-center items-center">
            <Button variant="outline" className="mx-10 bg-linear-to-r from-red-500 to-red-900 hover:scale-110">L👎🏻 I smoked</Button>
            <Button variant="default" className="mx-10 bg-linear-to-r from-green-500 to-green-900 hover:scale-110">W🤙🏻 I didn't</Button>
        </div>
    )
}