body {
  margin: 0;
  padding: 0;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  overflow: hidden;
}

.main {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.4s ease;
}

.title {
  font-size: 3rem;
  margin-bottom: 20px;
  transition: opacity 0.4s ease, transform 0.4s ease;
  opacity: 1;
  transform: translateY(0);
}

.title.hidden {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

#target-time {
  font-size: 2rem;
  padding: 10px;
  background: #1e1e1e;
  border: none;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
}

.countdown {
  font-size: 8rem;
  font-weight: normal;
  margin: 20px 0 20px;
  transition: font-size 0.3s ease;
}

/* Progress bar styles removed */

#startStopBtn {
  padding: 12px 30px;
  font-size: 1.5rem;
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

#startStopBtn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

#fullscreenBtn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: transparent;
  color: #ffffff;
  font-size: 1.5rem;
  border: 1px solid #ffffff;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
}

#fullscreenBtn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
