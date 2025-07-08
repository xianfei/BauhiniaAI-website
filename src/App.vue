<template>
  <div class="homepage">
    <!-- Header -->
    <header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div class="logo">
        <img src="@assets/vue.svg" alt="BAUHINIA AI" />
      </div>
      <nav class="nav">
        <button @click="scrollToSection('vision')" class="nav-btn">Vision</button>
        <button @click="scrollToSection('projects')" class="nav-btn">Projects</button>
      </nav>
    </header>

    <!-- Hero Section -->
    <section id="vision" class="hero-section">
      <div class="hero-background">
        <img 
          src="@assets/bg.svg" 
          alt="" 
          class="bg-image" 
          :style="bgImageStyle"
        />
      </div>
      <div class="hero-content">
        <h1 class="hero-title" :style="{fontFamily: myfonts.family}">
          Reshape the Future<br>
          with AI Agents
        </h1>
        <div class="hero-subtitle">
          <p>Research-driven.</p>
          <p>Product-grounded.</p>
          <p>Agent-first.</p>
        </div>
        <button class="cta-button" @click="openaiv">Try Aivilization</button>
      </div>
    </section>

    <div class="hero-padding"></div>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <vue-markdown-it :source="markdown" class="mission-text" />
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <div class="container">
        <h2 class="section-title"  :style="{fontFamily: myfonts.family}">Projects</h2>
        
        <div class="project-grid">
          <div 
            v-for="project in projects" 
            :key="project.id" 
            class="project-card"
          >
            <div class="project-content">
              <h3 class="project-title" :style="{fontFamily: myfonts.family}">{{ project.title }}</h3>
              <ul class="project-features">
                <li v-for="feature in project.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
              <p class="project-description">
                {{ project.description }}
              </p>
              <button class="learn-more-btn" @click="open(project.link)">Learn More</button>
            </div>
            <div class="project-image">
              <!-- <img class="img" :src="project.image" :alt="project.title" /> -->
               <div class="img" >
                <div class="iframe-wrapper">

                  <iframe :src="project.link" style=""></iframe>
                </div>
                </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@assets/vue.svg" alt="BAUHINIA AI" />
        </div>
        <div class="footer-nav">
          <div class="footer-section">
            <h4>Projects</h4>
            <ul>
              <li v-for="project in projects" :key="project.id">
                <a :href="project.link" target="_blank">{{ project.title }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact Us</h4>
            <p>info@bauhiniaai.com</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

import { css } from '@assets/DingTalk Sans.ttf'

export default {
  name: 'Homepage',
  data() {
    return {
      isScrolled: false,
      scrollY: 0,
      myfonts: css,
      markdown: "",
      markdown_: `Our mission is to build powerful and practical **AI agents** capable of **solving real-world tasks**.

Originating from the Digital Finance Lab at HKUST, our team **blends academic depth with real-world engineering expertise** to push the boundaries of autonomous intelligence.

We believe that agents should not only reason, plan, and learn - but also adapt to social environments, collaborate with humans, and operate in open-ended systems.

As we continue to build, we are **laying the groundwork for a broader ecosystem of agent-native applications** spanning communication, simulation, and real-world decision-making.

`.split(' '),
      projects: [
        {
          id: 1,
          title: 'Aivilization',
          features: [
            'Simulate Societies.',
            'Accelerate Research.'
          ],
          description: 'From open-world game AINPCs to social science and economic modeling, Aivilization empowers large-scale, dynamic simulations that feel alive and adaptive.',
          image: '/path/to/aivilization-image.png',
          link:'https://www.aivilization.ai/'
        },
        {
          id: 2,
          title: 'Wetips',
          features: [
            'Smarter Conversations, Instantly.'
          ],
          description: 'Wetips attaches to your favorite chatapps, offering AI-generated reply suggestions, tone control, and document-based Q&A - all with privacy.',
          image: '/path/to/wetips-image.png',
          link:'https://wetips.ai/?source=bauhiniaai'
        }
      ]
    }
  },
  computed: {
    bgImageStyle() {
      // 获取视窗高度作为参考
      const viewportHeight = window.innerHeight || 800;
      // 计算滚动进度 (0-1)
      const scrollProgress = Math.min(this.scrollY / viewportHeight, 1);
      
      // 初始旋转角度110度，随滚动增加到270度
      const rotation = 110 + (scrollProgress * 160);
      
      // 初始透明度0.8，随滚动降低到0
      const opacity = Math.max(0.8 - (scrollProgress * 1.2), 0);
      
      // 初始缩放0.8，可以稍微调整
      const scale = 0.7 - (scrollProgress * 0.1);
      
      return {
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity: opacity,
        transition: 'none' // 移除过渡以获得平滑的滚动效果
      };
    }
  },
  mounted() {
    const app = this
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('DOMContentLoaded', function () {
      // 获取所有需要延迟自动播放的视频元素
      const videos = document.querySelectorAll('.mission-section');

      // 检查浏览器是否支持 Intersection Observer
      if ('IntersectionObserver' in window) {
        // 创建 Intersection Observer 实例
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const video = entry.target;
              // 尝试播放视频
              if(!app.markdown){
                const foo = () => setTimeout(()=>{
                  app.markdown += app.markdown_[0] + ' '
                  app.markdown_ = app.markdown_.slice(1)
                  if(app.markdown_.length>0) foo()
                },30)
                foo()
              }

              // 视频已处理，停止观察
              observer.unobserve(video);
            }
          });
        }, {
          threshold: 0.5 // 当视频70%可见时触发
        });


        // 为每个视频设置观察
        videos.forEach(video => {
          observer.observe(video);
          // 预加载视频元数据以减少播放延迟
        });
      } else {
        videos.forEach(video => {
          // 简单地将所有视频设置为自动播放（可能不太理想）
          app.markdown = app.markdown_
        });
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openaiv(){
      window.open('https://www.aivilization.ai/', '_blank');
    },
    openwet(){
      window.open('https://www.wetips.ai/', '_blank');
    },
    handleScroll() {
      this.scrollY = window.scrollY;
      // 当滚动超过第一屏（100vh）时显示header背景
      this.isScrolled = this.scrollY > 500;
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    open(url){
      window.open(url, '_blank');
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  overflow-x: hidden;
  background-color: #f8f9fa;;
}

.homepage {
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.logo{
line-height: 1;
}

.logo img {
  height: 32px;
  
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-btn {
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-btn:hover {
  color: #0066cc;
}

/* Hero Section */



.bg-image {
  width: 1200px;
  position: fixed;
  top: -160px;
  left: calc(50vw - 700px);
  height: auto;
  z-index: 4;
  opacity: 0.8;
  pointer-events: none;
}

.hero-padding{
  height: 800px;
}

.hero-content {
  position: absolute;
  left: 40vw;
  top: 250px;
  z-index: 2;
  text-align: left;
  color: #333;
}

.hero-title {
  font-size: 48px;
  font-weight: 400;
  margin: 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.hero-subtitle p {
  margin: 0.1rem 0;
}

.cta-button {
  
  background: none;
  border: 1px solid #333;
  color: #333;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.cta-button:hover {
  background: #333;
  color: white;
}

/* Mission Section */
.mission-section {
  padding: 4rem 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
}

.mission-text p {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.1rem;
  color: #444;
  margin: 0 20px;
  margin-bottom: 1.5rem;
  max-width: 800px;
}

/* Projects Section */
.projects-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
  font-weight: 400;
}

.section-title::before {
  content: '/';
  color: #999;
  margin-right: 0.5rem;
}

.project-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.project-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.project-features {
  list-style: none;
  margin-bottom: 1.5rem;
}

.project-features li {
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.project-features li::before {
  content: '•';
  color: #0066cc;
  margin-right: 0.5rem;
  font-weight: bold;
}

.project-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.learn-more-btn {
  background: none;
  border: 1px solid #333;
  color: #333;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.learn-more-btn:hover {
  background: #333;
  color: white;
}

.project-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-image .img {
  width: 100%;
  max-width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  background: #e9ecef;
  /* pointer-events: none; */
  overflow: hidden;
}

.iframe-wrapper {
  transform: scale(0.4);
  transform-origin: top left;
  width: 250%; /* 为了补偿缩小比例 */
  height: 250%;
}

.iframe-wrapper iframe{
  width: 100%;
  height: 100%;
    border: none;
}


/* Footer */
.footer {
  background: #222;
  color: white;
  padding: 3rem 0 50px;
  position: absolute;
  /* left: 0; */
  width: 100vw;
  height: 300px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
}

.footer-logo img {
  height: 32px;
  filter: brightness(0) invert(1);
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
    /* flex-direction: column; */
    gap: 1rem;
  }

  .hero-background{
        transform: rotate(90deg);
        margin-top: -20px;
        margin-left: 150px;
  }

  .bg-image{
    width: 500px;
    left: 30vw;
    
  }

  .footer{
    height: 500px;
  }

  .hero-content{
    left: 40px;
    top: 150px;
  }

  .hero-padding{
  height: 500px;
}

  .hero-title {
    font-size: 2.5rem;
  }

  .project-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-nav {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .nav {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .project-card {
    padding: 1.5rem;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>