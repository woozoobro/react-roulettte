import { useState, useEffect } from 'react'
import "./App.css";
import RouletteWheel from './RouletteWheel';
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';
import Modal from "react-modal";

interface WeightedWheelData extends WheelData {
  weight: number;
}

const App = () => {
  const [tries, setTries] = useState(0);

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 트라이 횟수를 로드합니다.
    const savedTries = parseInt(localStorage.getItem('rouletteTries') || '0', 10);
    setTries(savedTries);
  }, []);

  const prizeItems: WeightedWheelData[] = [
    { option: "꽝", weight: 15 },
    { option: "광택용 천", weight: 2 },
    { option: "스댕리", weight: 1 },    
    { option: "벨킨 맥세이프", weight: 1 },
    { option: "모프트 거치대", weight: 1 },    
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleSpinClick = () => {
    const newTries = tries + 1;
    setTries(newTries);
    localStorage.setItem('rouletteTries', newTries.toString()); 
    const totalWeight = prizeItems.reduce((acc, item) => acc + item.weight, 0);
    const randomNum = Math.random() * totalWeight;
    let weightSum = 0;

    const selectedPrizeIndex = prizeItems.findIndex(item => {
      weightSum += item.weight;
      return randomNum < weightSum;
    });

    setPrizeNumber(selectedPrizeIndex);
    setMustSpin(true);
  }

  const handleSpinEnd = () => {
    const message = `우와~! 선물은 ${prizeItems[prizeNumber].option}입니다!`;
    setModalContent(message);
    setMustSpin(false);

    setTimeout(() => {
      setModalIsOpen(true);
    }, 300);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>두근 두근 룰렛</h1>
        <RouletteWheel
          data={prizeItems}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          onStopSpinning={handleSpinEnd}
        />
        <button onClick={handleSpinClick} disabled={mustSpin}>뽑기</button>
        <p>뽑기 시도 횟수: {tries}</p>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="추첨 결과"
          style={{
            overlay: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              transition: 'opacity 300ms ease-in-out',
              zIndex: 1000
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%) scale(0.7)',
              transition: 'transform 300ms ease-in-out',
              fontSize: '20px',
              borderRadius: "10px",              
            }
          }}
          closeTimeoutMS={300}
        >
          <h2>축하합니다!</h2>
          <div>{modalContent}</div>
          {prizeItems[prizeNumber].option !== "꽝" && <div>{tries}트 만에 성공..</div>}
          <button onClick={closeModal}>확인</button>
        </Modal>
      </header>
    </div>
  )
}

export default App;
