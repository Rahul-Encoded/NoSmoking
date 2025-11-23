export default function Footer() {
    return (
        <footer className="w-full py-6 px-4 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    For future plans, collaboration and more robust edits, visit our{' '}
                    <a
                        href="https://github.com/Rahul-Encoded/NoSmoking"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        GitHub repository
                    </a>
                </p>
            </div>
        </footer>
    )
}