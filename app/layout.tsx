export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to My Awesome App! 🎉</h1>
            <p className="text-gray-600 mb-6">Join us today and explore the amazing features!</p>
            <div className="flex justify-center gap-4">
              <a href="/login" className="btn btn-primary">Login</a>
              <a href="/signup" className="btn btn-secondary">Sign Up</a>
            </div>
          </div>
          <div className="mt-8">{children}</div>
        </body>
      </html>
    );
  }
  