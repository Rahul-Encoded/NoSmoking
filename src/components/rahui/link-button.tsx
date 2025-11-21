import Link from "next/link";

interface LinkButtonProps {
    content: string;
    link: string;
}

export default function LinkButton({ content, link }: LinkButtonProps) {
    return (
        <Link href={link} className="inline-block px-12 py-4 text-lg font-bold text-secondary bg-linear-to-r from-green-500 to-green-900 rounded-xl shadow-2xl shadow-green-600/40 hover:bg-green-400 transition transform hover:scale-105 duration-500">
            {content}
        </Link>
    )
}