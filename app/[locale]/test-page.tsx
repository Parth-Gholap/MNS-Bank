export default function TestPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center">
        Test Page - Locale: {params.locale}
      </h1>
      <p className="text-center mt-4">
        This is a test page to verify routing works.
      </p>
    </div>
  );
}
