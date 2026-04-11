import React, { useState } from 'react';

export default function AioLanding() {
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, zipCode, quizAnswers })
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setZipCode('');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Error signing up. Please try again.');
    } finally {
      setLoading(false);
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
      a: 'IV therapy delivers vitamins, minerals, and hydration directly into your bloodstream for maximum absorption. It\'s faster and more effective than oral supplements.'
    },
    {
      q: 'Is IV therapy safe?',
      a: 'Yes. All our providers are licensed medical professionals (RNs, NPs, or MDs) who follow strict safety protocols.'
    },
    {
      q: 'How long does a session take?',
      a: 'Most sessions take 30-45 minutes. A licensed nurse will arrive at your location, set up the IV, and monitor you throughout.'
    },
    {
      q: 'How much does it cost?',
      a: 'Pricing typically ranges from $150-$300 per session depending on provider and treatment type.'
    },
    {
      q: 'Do I need a prescription?',
      a: 'No prescription is needed for most wellness IV treatments. Our providers conduct a brief health screening first.'
    },
    {
      q: 'What areas do you serve?',
      a: 'We\'re launching nationwide! Enter your ZIP code to see if we serve your location.'
    }
  ];

  const handleQuizAnswer = (qId, val) => {
    const newAnswers = { ...quizAnswers, [qId]: val };
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizStep(0);
    setQuizAnswers({});
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', margin: 0, padding: 0 }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fafaf8; }
      `}</style>

      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #e5e5e5', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Aio</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://instagram.com/aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1a1a1a', fontSize: '1.2rem', transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.background = '#e0e0e0'} onMouseOut={(e) => e.target.style.background = '#f0f0f0'}>📷</a>
            <a href="https://tiktok.com/@aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1a1a1a', fontSize: '1.2rem', transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.background = '#e0e0e0'} onMouseOut={(e) => e.target.style.background = '#f0f0f0'}>🎵</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ minHeight: '600px', background: 'linear-gradient(135deg, #f5f7f5 0%, #e8ede8 50%, #f0f4f0 100%)', padding: '3rem 2rem', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          {/* Left Content */}
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.2, color: '#1a1a1a' }}>
              Premium IV Therapy Delivered to You
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
              Get vitamins, hydration, and recovery treatments from licensed professionals. Fast, safe, and on your schedule.
            </p>
            <button
              onClick={() => setShowQuiz(true)}
              style={{
                padding: '1rem 2rem',
                background: '#5a8a5a',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(90,138,90,0.3)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Start Assessment
            </button>
          </div>

          {/* Right: Form + Image */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>Join the waitlist</h3>
                  <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Get $50 off your first treatment + early access</p>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: '#4a4a4a' }}>Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '2px solid #e5e5e5',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'border 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#5a8a5a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: '#4a4a4a' }}>ZIP Code</label>
                    <input
                      type="text"
                      placeholder="Enter your ZIP"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      required
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '2px solid #e5e5e5',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'border 0.2s',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#5a8a5a'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: loading ? '#aaa' : '#5a8a5a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {loading ? 'Signing up...' : 'Get Early Access'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>You're on the list!</h3>
                  <p style={{ color: '#666' }}>We'll send you personalized provider matches when we launch in your area.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      marginTop: '1.5rem',
                      padding: '0.75rem 1.5rem',
                      background: '#5a8a5a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    Sign up another email
                  </button>
                </div>
              )}
            </div>
            <div style={{ background: 'linear-gradient(135deg, #e8ede8 0%, #f0f4f0 100%)', borderRadius: '20px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '0.9rem', backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }} />
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5a8a5a', marginBottom: '1rem' }}>SIMPLE PROCESS</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 500, marginBottom: '1rem', color: '#1a1a1a' }}>From search to treatment in minutes</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 4rem' }}>
            We connect you with licensed medical professionals who provide IV therapy at your location.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            {[
              { num: '1', title: 'Assessment', text: 'Tell us about your wellness goals through a quick questionnaire.' },
              { num: '2', title: 'Compare Providers', text: 'View pricing, availability, and reviews from licensed professionals.' },
              { num: '3', title: 'Get Treated', text: 'A provider arrives at your location. Sessions take 30-45 minutes.' }
            ].map((step) => (
              <div key={step.num} style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #f8faf8 0%, #ffffff 100%)', borderRadius: '20px', border: '1px solid #e8ede8', textAlign: 'left' }}>
                <div style={{ width: '50px', height: '50px', background: '#5a8a5a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>{step.num}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#1a1a1a' }}>{step.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '6rem 2rem', background: '#fafaf8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5a8a5a', marginBottom: '1rem' }}>FAQ</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 500, color: '#1a1a1a' }}>Everything you need to know</h2>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1a1a1a'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.5rem', color: '#5a8a5a', transition: 'transform 0.2s', transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: '#666', lineHeight: 1.6, borderTop: '1px solid #f0f0f0' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', background: 'white', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="#about" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#5a8a5a'} onMouseOut={(e) => e.target.style.color = '#666'}>About Us</a></li>
                <li><a href="#contact" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#5a8a5a'} onMouseOut={(e) => e.target.style.color = '#666'}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', margin: '0 0 1rem 0' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="#terms" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#5a8a5a'} onMouseOut={(e) => e.target.style.color = '#666'}>Terms</a></li>
                <li><a href="#privacy" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#5a8a5a'} onMouseOut={(e) => e.target.style.color = '#666'}>Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', margin: '0 0 1rem 0' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href="https://instagram.com/aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1a1a1a', fontSize: '1rem', transition: 'all 0.2s' }} onMouseOver={(e) => e.target.style.background = '#e0e0e0'} onMouseOut={(e) => e.target.style.background = '#f0f0f0'}>📷</a>
                <a href="https://tiktok.com/@aio_ivtherapy" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1a1a1a', fontSize: '1rem', transition: 'all 0.2s' }} onMouseOver={(e) => e.target.style.background = '#e0e0e0'} onMouseOut={(e) => e.target.style.background = '#f0f0f0'}>🎵</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>© 2026 Aio by Pipe Labs LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      {showQuiz && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            backdropFilter: 'blur(5px)'
          }}
          onClick={resetQuiz}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '3rem',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {quizStep < quizQuestions.length ? (
              <>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem' }}>
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '4px',
                        background: i <= quizStep ? '#5a8a5a' : '#e5e5e5',
                        borderRadius: '2px',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#1a1a1a', lineHeight: 1.3 }}>
                  {quizQuestions[quizStep].question}
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {quizQuestions[quizStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleQuizAnswer(quizQuestions[quizStep].id, opt.value)}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: 'white',
                        border: '2px solid #e5e5e5',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1.05rem',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        fontWeight: 500,
                        color: '#1a1a1a'
                      }}
                      onMouseOver={(e) => e.target.style.borderColor = '#5a8a5a'}
                      onMouseOut={(e) => e.target.style.borderColor = '#e5e5e5'}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '80px', height: '80px', background: '#5a8a5a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2.5rem', color: 'white' }}>✓</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1a1a1a' }}>Assessment complete</h3>
                <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  We'll match you with the best providers in your area based on your wellness goals.
                </p>
                <button
                  onClick={resetQuiz}
                  style={{
                    padding: '1rem 3rem',
                    background: '#5a8a5a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
