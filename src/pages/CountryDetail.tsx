import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function CountryDetail() {
  const { id } = useParams();
  const [country, setCountry] = useState<{ name: string; body: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/countries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data.country);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  console.log(JSON.stringify(country?.body));

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!country)
    return <div className="text-center mt-8">Country not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1
        className="text-3xl sm:text-5xl font-black mb-8"
        style={{ fontFamily: "Wise Sans, sans-serif" }}
      >
        {country.name}
      </h1>
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {country.body.replace(/\\n/g, '\n')}
        </ReactMarkdown>
      </div>
    </div>
  );
}
