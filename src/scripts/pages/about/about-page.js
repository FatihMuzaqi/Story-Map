export default class AboutPage {
  async render() {
    return `
      <section class="container">
        <h1>About</h1>
        <div class="about-card">
            <div class="decorative-element"></div>
            
            <h2 class="app-title">Story Map App</h2>
            <p class="app-description">
                Story Map adalah aplikasi untuk berbagi cerita dan pengalaman yang terkait dengan lokasi tertentu. 
                Temukan dan bagikan momen berharga Anda dengan komunitas yang saling terhubung melalui cerita.
            </p>

            <ul class="feature-list">
                <li class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-upload"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Upload Cerita</h3>
                        <p>Bagikan pengalaman Anda dengan deskripsi yang menarik, foto berkualitas tinggi, dan lokasi yang tepat menggunakan peta interaktif yang mudah digunakan.</p>
                    </div>
                </li>
                <li class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Jelajahi Peta</h3>
                        <p>Temukan cerita menarik dari berbagai lokasi di seluruh Indonesia melalui peta interaktif yang memungkinkan Anda menjelajahi dunia dengan perspektif baru.</p>
                    </div>
                </li>
                <li class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <div class="feature-content">
                        <h3>Baca Cerita</h3>
                        <p>Nikmati cerita dan pengalaman inspiratif dari pengguna lain untuk menambah wawasan, mendapatkan ide perjalanan, dan terhubung dengan komunitas.</p>
                    </div>
                </li>
            </ul>

            <div class="stats-section">
                <div class="stat-item">
                    <span class="stat-number">1K+</span>
                    <span class="stat-label">Cerita Terbagi</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">500+</span>
                    <span class="stat-label">Lokasi Unik</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">2K+</span>
                    <span class="stat-label">Pengguna Aktif</span>
                </div>
            </div>
        </div>
    </section>
    `;
  }

  async afterRender() {
    const animateElements = () => {
      const featureItems = document.querySelectorAll(".feature-list li");
      const techItems = document.querySelectorAll(".tech-item");
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-in");
        }, 100 * index);
      });
      techItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-in");
        }, 100 * index);
      });
    };
    setTimeout(animateElements, 300);
    const style = document.createElement("style");
    style.textContent = `


       .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            color: white;
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 40px;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.02em;
        }

        .about-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 50px;
            border-radius: 24px;
            box-shadow: 
                0 25px 60px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .app-title {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            text-align: center;
        }

        .app-description {
            font-size: 1.2rem;
            color: #555;
            line-height: 1.7;
            text-align: center;
            margin-bottom: 50px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .feature-list {
            list-style: none;
            display: grid;
            gap: 30px;
            margin-top: 40px;
        }

        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 25px;
            padding: 30px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1));
            border-radius: 20px;
            border: 1px solid rgba(102, 126, 234, 0.1);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }

        .feature-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.6s;
        }

        .feature-item:hover {
            transform: translateY(-8px);
            box-shadow: 
                0 20px 40px rgba(102, 126, 234, 0.2),
                0 0 0 1px rgba(102, 126, 234, 0.1);
            border-color: rgba(102, 126, 234, 0.3);
        }

        .feature-item:hover::before {
            left: 100%;
        }

        .feature-icon {
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 18px;
            font-size: 1.8rem;
            color: white;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
        }

        .feature-item:nth-child(1) .feature-icon {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }

        .feature-item:nth-child(2) .feature-icon {
            background: linear-gradient(135deg, #4ecdc4, #44a08d);
        }

        .feature-item:nth-child(3) .feature-icon {
            background: linear-gradient(135deg, #45b7d1, #96c93d);
        }

        .feature-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 12px;
            letter-spacing: -0.01em;
        }

        .feature-content p {
            font-size: 1.1rem;
            color: #666;
            line-height: 1.6;
        }

        .decorative-element {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1));
            top: -100px;
            right: -100px;
            z-index: -1;
        }

        .stats-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 50px;
            padding-top: 40px;
            border-top: 1px solid rgba(102, 126, 234, 0.1);
        }

        .stat-item {
            text-align: center;
            padding: 20px;
            border-radius: 16px;
            background: rgba(102, 126, 234, 0.05);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: block;
        }

        .stat-label {
            font-size: 1rem;
            color: #666;
            margin-top: 8px;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            body {
                padding: 20px 15px;
            }

            h1 {
                font-size: 2rem;
                margin-bottom: 30px;
            }

            .about-card {
                padding: 30px 25px;
                border-radius: 20px;
            }

            .app-title {
                font-size: 2rem;
            }

            .app-description {
                font-size: 1.1rem;
                margin-bottom: 40px;
            }

            .feature-item {
                flex-direction: column;
                text-align: center;
                gap: 20px;
                padding: 25px 20px;
            }

            .feature-icon {
                width: 60px;
                height: 60px;
                font-size: 1.5rem;
                margin: 0 auto;
            }

            .stats-section {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-top: 40px;
            }

            .stat-number {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .about-card {
                padding: 25px 20px;
            }

            .app-title {
                font-size: 1.8rem;
            }

            .feature-content h3 {
                font-size: 1.3rem;
            }

            .feature-content p {
                font-size: 1rem;
            }
        }

        /* Animation for scroll reveal */
        .feature-item {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s ease forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Floating animation for icons */
        .feature-icon {
            animation: float 3s ease-in-out infinite;
        }

        .feature-item:nth-child(2) .feature-icon {
            animation-delay: -1s;
        }

        .feature-item:nth-child(3) .feature-icon {
            animation-delay: -2s;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
  }
}
