cd /home/aio/src

cat > App.js << 'NATIONAL'
import React, { useState } from 'react';

export default function AioLanding() {
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, zipCode, quizAnswers })
      });
      setSubmitted(true);
      setTimeout(() => setShowQuiz(true), 1500);
    } catch (error) {
      setSubmitted(true);
    }
  };

  const quizQuestions = [
    { 
      id: 'goal', 
      question: 'What brings you to IV therapy?', 
      options: [
        { value: 'hydration', label: 'Hydration & Athletic Recovery' },
        { value: 'immunity', label: 'Immune System Support' },
        { value: 'energy', label: 'Energy & Performance Enhancement' },
        { value: 'wellness', label: 'General Wellness & Vitality' }
      ]
    },
    { 
      id: 'frequency', 
      question: 'How often would you use this service?', 
      options: [
        { value: 'first', label: 'First time trying IV therapy' },
        { value: 'occasional', label: 'Occasionally (monthly)' },
        { value: 'regular', label: 'Regularly (weekly or bi-weekly)' },
        { value: 'athlete', label: 'Frequent use for training/performance' }
      ]
    },
    { 
      id: 'location', 
      question: 'Where would you prefer to receive service?', 
      options: [
        { value: 'home', label: 'My home' },
        { value: 'office', label: 'My office or workplace' },
        { value: 'gym', label: 'Gym or fitness studio' },
        { value: 'flexible', label: 'Flexible - any location' }
      ]
    }
  ];

  const faqs = [
    {
      q: 'What is IV therapy?',
      a: 'IV therapy delivers vitamins, minerals, and hydration directly into your bloodstream for maximum absorption. It\'s faster and more effective than oral supplements, providing immediate benefits for hydration, energy, immunity, and recovery.'
    },
    {
      q: 'Is IV therapy safe?',
      a: 'Yes. All our partner providers are licensed medical professionals (RNs, NPs, or MDs) who follow strict safety protocols. IV therapy has been used in medical settings for decades and is considered very safe when administered by qualified practitioners.'
    },
    {
      q: 'How long does a session take?',
      a: 'Most IV therapy sessions take 30-45 minutes. A licensed nurse will arrive at your location, set up the IV, and monitor you throughout the treatment. You can relax, work, or watch TV during your session.'
    },
    {
      q: 'How much does it cost?',
      a: 'Pricing varies by provider and treatment type, typically ranging from $150-$300 per session. Aio helps you compare prices across providers to find the best value. Many providers offer package deals for regular clients.'
    },
    {
      q: 'Do I need a prescription?',
      a: 'No prescription is needed for most wellness IV treatments. Our providers will conduct a brief health screening before your first session to ensure IV therapy is appropriate for you.'
    },
    {
      q: 'What areas do you serve?',
      a: 'We\'re launching nationwide! Enter your ZIP code to see if we serve your location. We\'re rapidly expanding to major metros across the United States - join the waitlist to be notified when we launch in your area.'
    }
  ];

  const handleQuizAnswer = (qId, val) => {
    const newAnswers = { ...quizAnswers, [qId]: val };
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fafaf8; }
      `}</style>
      
      <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7f5 0%, #e8ede8 50%, #f0f4f0 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', right: '0', width: '50%', height: '100%', background: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
        
        <div style={{ position: 'relative', zIndex: 2, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.9)', borderRadius: '100px', fontSize: '0.85rem', color: '#4a6b4a', fontWeight: 500 }}>
              🇺🇸 Available Nationwide
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com/aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1a1a1a', fontSize: '1.2rem' }}>📷</a>
              <a href="https://tiktok.com/@aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1a1a1a', fontSize: '1.2rem' }}>🎵</a>
            </div>
          </div>

          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 500, lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '700px' }}>
            Premium IV therapy,<br /><span style={{ fontStyle: 'italic', color: '#5a8a5a' }}>delivered to you</span>
          </h1>
          
          <p style={{ fontSize: '1.3rem', lineHeight: 1.6, color: '#4a4a4a', maxWidth: '600px', marginBottom: '3rem' }}>
            Connect with licensed IV therapy providers in your area. Compare pricing, read reviews, and book treatments delivered to your location nationwide.
          </p>

          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', maxWidth: '500px' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>Join the waitlist</h3>
                <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Get $50 off your first treatment + early access</p>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: '#4a4a4a' }}>Email</label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: '#4a4a4a' }}>ZIP Code</label>
                  <input type="text" placeholder="Enter your ZIP" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required maxLength="5" pattern="[0-9]{5}" style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                  <small style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>We'll find providers in your area</small>
                </div>
                <button type="submit" style={{ width: '100%', padding: '1rem', background: '#5a8a5a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>Get Early Access</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>You're on the list!</h3>
                <p style={{ color: '#666' }}>We'll send you personalized provider matches when we launch in your area.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5a8a5a', marginBottom: '1rem' }}>SIMPLE PROCESS</div>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 500, marginBottom: '1rem' }}>From search to treatment in minutes</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 4rem' }}>
            We connect you with licensed medical professionals who provide IV therapy at your location across the United States.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { num: '1', title: 'Complete quick assessment', text: 'Tell us about your wellness goals and preferred service location through our brief questionnaire.' },
              { num: '2', title: 'Compare providers', text: 'View real-time pricing, availability, and verified reviews from licensed medical professionals in your area.' },
              { num: '3', title: 'Receive treatment', text: 'A licensed healthcare provider arrives at your location with medical-grade IV therapy. Treatments typically take 30-45 minutes.' }
            ].map(s => (
              <div key={s.num} style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #f8faf8 0%, #ffffff 100%)', borderRadius: '20px', border: '1px solid #e8ede8', textAlign: 'left' }}>
                <div style={{ width: '50px', height: '50px', background: '#5a8a5a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>{s.num}</div>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: '1.4rem', marginBottom: '1rem', color: '#1a1a1a' }}>{s.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{s.text}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setShowQuiz(true)} style={{ marginTop: '3rem', padding: '1.25rem 3rem', background: '#5a8a5a', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(90,138,90,0.3)' }}>
            Start Your Assessment
          </button>
        </div>
      </section>

      <section id="faq" style={{ padding: '6rem 2rem', background: '#fafaf8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5a8a5a', marginBottom: '1rem' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 500 }}>Everything you need to know</h2>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)} style={{ width: '100%', padding: '1.5rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 600 }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.5rem', color: '#5a8a5a' }}>{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: '#666', lineHeight: 1.6 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem 2rem', background: 'white', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <a href="https://instagram.com/aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>Instagram</a>
            <a href="https://tiktok.com/@aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>TikTok</a>
            <a href="#faq" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>FAQ</a>
          </div>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>© 2026 Aio by Pipe Labs LLC. All rights reserved.</p>
        </div>
      </footer>

      {showQuiz && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={() => setShowQuiz(false)}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', maxWidth: '600px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
            {quizStep < quizQuestions.length ? (
              <>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem' }}>
                  {quizQuestions.map((_, i) => <div key={i} style={{ flex: 1, height: '4px', background: i <= quizStep ? '#5a8a5a' : '#e5e5e5', borderRadius: '2px', transition: 'all 0.3s' }} />)}
                </div>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: '2rem', marginBottom: '2rem', color: '#1a1a1a' }}>{quizQuestions[quizStep].question}</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {quizQuestions[quizStep].options.map(opt => (
                    <button key={opt.value} onClick={() => handleQuizAnswer(quizQuestions[quizStep].id, opt.value)} style={{ padding: '1.25rem 1.5rem', background: 'white', border: '2px solid #e5e5e5', borderRadius: '12px', cursor: 'pointer', fontSize: '1.05rem', textAlign: 'left', transition: 'all 0.2s', fontWeight: 500 }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '80px', height: '80px', background: '#5a8a5a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2.5rem', color: 'white' }}>✓</div>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: '2rem', marginBottom: '1rem', color: '#1a1a1a' }}>Assessment complete</h3>
                <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>We'll match you with the best providers in your area based on your wellness goals and preferences.</p>
                <button onClick={() => setShowQuiz(false)} style={{ padding: '1rem 3rem', background: '#5a8a5a', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
