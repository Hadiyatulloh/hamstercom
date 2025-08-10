// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [showPlusOne, setShowPlusOne] = useState(false);
//   const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
//   const [boost, setBoost] = useState(6500);
//   const [coin, setCoin] = useState(0);
//   const [coinPerTab, setCoinPerTab] = useState(1);
//   const [clickCount, setClickCount] = useState(0);
//   const [level, setLevel] = useState(1);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [rotate, setRotate] = useState(false);
                                 
//   const handleBtn = (event) => {
//     if (!isDisabled) {                                         
//       const rect = event.currentTarget.getBoundingClientRect();
//       setClickPosition({
//         x: event.clientX - rect.left,
//         y: event.clientY - rect.top,
//       });

//       const newClickCount = clickCount + 1;
//       setClickCount(newClickCount);

//       if (newClickCount % 20 === 0) {
//         const newLevel = level + 1;
//         setLevel(newLevel);
//         setCoinPerTab(newLevel);
//       }

//       setCoin(prev => prev + coinPerTab);

//       setBoost(prevBoost => {
//         const newBoost = prevBoost - coinPerTab;
//         if (newBoost <= 0) {
//           setIsDisabled(true);
//           return 0;
//         }
//         return newBoost;
//       });

//       setShowPlusOne(true);
//       setTimeout(() => setShowPlusOne(false), 500);

//       setRotate(true);
//       setTimeout(() => setRotate(false), 300);
//     }
//   };

//   return (
//     <div className='main'>
//       <div className="box">
//         <h2>Hamster Kombat</h2>
//         <div className="header">
//           <div className="header-box">
//             <h3>Earn per tap</h3>
//             <div className="img">
//               <img src="./coin.png" alt="coin" />
//               <span>nomalum narsa</span>
//             </div>
//           </div>
//           <div className="header-box">
//             <h3>Coins to level</h3>
//             <div className="img">
//               <img src="./coin.png" alt="coin" />
//               <span>{level}</span>
//             </div>
//           </div>
//           <div className="header-box">
//             <h3>Profit per hour</h3>
//             <div className="img">
//               <img src="./coin.png" alt="coin" />
//               <span>+{coinPerTab}</span>
//             </div>
//           </div>
//         </div>

//         <div className="hamster-main">
//           <h1><img src="./coin2.png" alt="" />{coin}</h1>
//           <div style={{ position: 'relative' }}>
//             <button
//               id='button'
//               onClick={handleBtn}
//               className='hamster-btn'
//               disabled={isDisabled}
//             >
//               <img  style={{ transform: rotate ? "rotate(360deg)" : "rotate(0deg)", transition: "transform 0.023s" }} src="./hamster.png" alt="" />
//             </button>
//             {showPlusOne && (
//               <span
//                 style={{
//                   position: 'absolute',
//                   left: clickPosition.x,
//                   top: clickPosition.y - 50,
//                   color: 'red',
//                   fontWeight: 'bold',
//                   fontSize: '18px',
//                   animation: 'floatUp 0.5s ease-out',
//                   pointerEvents: 'none',
//                 }}
//               >
//                 +{coinPerTab}
//               </span>
//             )}
//           </div>
//           <div className="boost">
//             <h3><img src="./Vector.png" alt="" />{boost} / 6500</h3>
//             <h4>Boost</h4>
//           </div>
//         </div>

//         <div className="hamster-footer">
//           <div className="footer-menu">
//             <img src="./Union.png" alt="" />
//             <p>Exchange</p>
//           </div>
//           <div className="footer-menu">
//             <i className="fa-solid fa-gavel"></i>
//             <p>Mine</p>
//           </div>
//           <div className="footer-menu">
//             <i className="fa-solid fa-users"></i>
//             <p>Friends</p>
//           </div>
//           <div className="footer-menu">
//             <i className="fa-solid fa-coins"></i>
//             <p>Earn</p>
//           </div>
//           <div className="footer-menu">
//             <img src="./airdrop.png" alt="" />
//             <p>Airdrop</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [showPlusOne, setShowPlusOne] = useState(false);
  let [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  let [coin, setCoin] = useState(0);
  let [boost, setBoost] = useState(6500);
  let [level,setLevel]=useState(1);
  let [coinPerTap, setCoinPerTap] = useState(1);
  let [isDisabled,setIsDisalbed]=useState(false);
  useEffect(()=>{
   const interval=  setInterval(() => {
    setBoost((prevBoost) => (prevBoost<6500 ? prevBoost+3:6500))
   }, 1000);
   return () => clearInterval(interval)
  },[])

  const handleBtn = (event) => {
    if(!isDisabled){
     const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    levelUp();

    setShowPlusOne(true);
    boostCalc();
    setCoin(coin + coinPerTap);
    setTimeout(() => {
      setShowPlusOne(false);
    }, 500);
    }
  };
  function levelUp(){
    if(coin == 20){
      setLevel(level + 1)
      setCoinPerTap(level*2+1)
    }
    if(coin>99 && level ==2){
      setLevel(level + 1)
      setCoinPerTap(level*2+1)
    }
    if(coin>500 && level ==3){
      setLevel(level + 1)
      setCoinPerTap(level*2+1)
    }
  }

  function boostCalc() {
    if (boost-coinPerTap < coinPerTap) {
      setBoost(boost - coinPerTap);
      setIsDisalbed(true);
    } else {
      setBoost(boost - coinPerTap);
    }
  }



  return (
    <div className="main">
      <div className="box">
        <h2>Hamster Kombat</h2>
        <div className="header">
          <div className="header-box">
            <h3>Earn per tap</h3>
            <img src="./coin.png" alt="coin" /> <span>+{coinPerTap}</span>
          </div>
          <div className="header-box">
            <h3>Coins to level</h3>
            <img src="./coin.png" alt="coin" /> <span>+12</span>
          </div>
          <div className="header-box">
            <h3>Profit per hour</h3>
            <img src="./coin.png" alt="coin" /> <span>+{coinPerTap}</span>
          </div>
        </div>
        <div className="hamster-main">
          <h1>
            <img src="./coin2.png" alt="" />
            {coin}
          </h1>
          <div style={{ position: "relative" }}>
            <button onClick={handleBtn}  className="hamster-btn" >
              <img src="./hamster.png" alt="sd"   />
            </button>
            {showPlusOne && (
              <span
                style={{
                  position: "absolute",
                  left: clickPosition.x,
                  top: clickPosition.y - 50,
                  color: "orangered",
                  fontWeight: "bold",
                  fontSize: "24px",
                  animation: "floatUp 0.5s ease-out",
                  pointerEvents: "none",
                }}
              >
                +{coinPerTap}
              </span>
            )}
          </div>
          <div className="boost">
            <h3>
              <img src="./Vector.png" alt="" />
              {boost} / 6500
            </h3>
            <h4>Boost</h4>
          </div>
        </div>

        <div className="hamster-footer">
          <div className="footer-menu">
            <img src="./Union.png" alt="" />
            <p>Exchange</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-gavel"></i>
            <p>Mine</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-users"></i>
            <p>Friends</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-coins"></i>
            <p>Earn</p>
          </div>
          <div className="footer-menu">
            <img src="./airdrop.png" alt="" />
            <p>Airdrop</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
