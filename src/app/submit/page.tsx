import { SubmitForm } from "./SubmitForm";

export default function SubmitPage() {
    return (
        <main className="min-h-screen py-24 px-6 relative">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>
                        Submit Your Project
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                        Share your work with the community. Projects will be reviewed before they are published.
                    </p>
                </div>
                
                <SubmitForm />
            </div>
        </main>
    );
}
