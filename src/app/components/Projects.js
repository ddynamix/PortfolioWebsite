export default function Projects() {
    return (
        <section id="projects" className="py-20 bg-gray-50"> {/* Added id for scrolling */}
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    My Projects
                </h2>
                <div className="text-center text-gray-600">
                    {/* Placeholder for project listings */}
                    <p>Project details will go here soon!</p>
                    <p>You can use a grid layout to display project cards.</p>

                    {/* Example Grid Structure (Tailwind) */}
                    {/*
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="border p-4 rounded shadow">Project 1</div>
            <div className="border p-4 rounded shadow">Project 2</div>
            <div className="border p-4 rounded shadow">Project 3</div>
          </div>
          */}
                </div>
            </div>
        </section>
    );
}