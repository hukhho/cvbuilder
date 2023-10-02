import { Button } from 'antd';

const buttonStyles = [
  { borderColor: 'rgb(58, 46, 245)', backgroundColor: 'rgb(58, 46, 245)' },
  { borderColor: 'rgb(60, 120, 216)', backgroundColor: 'rgb(60, 120, 216)' },
  { borderColor: 'rgb(92, 200, 128)', backgroundColor: 'rgb(92, 200, 128)' },
  { borderColor: 'rgb(119, 243, 171)', backgroundColor: 'rgb(119, 243, 171)' },
  { borderColor: 'rgb(235, 78, 74)', backgroundColor: 'rgb(235, 78, 74)' },
  { borderColor: 'rgb(237, 111, 118)', backgroundColor: 'rgb(237, 111, 118)' },
  { borderColor: 'rgb(233, 75, 172)', backgroundColor: 'rgb(233, 75, 172)' },
  { borderColor: 'rgb(165, 51, 246)', backgroundColor: 'rgb(165, 51, 246)' },
  { borderColor: 'rgb(238, 121, 47)', backgroundColor: 'rgb(238, 121, 47)' },
  { borderColor: 'rgb(241, 155, 66)', backgroundColor: 'rgb(241, 155, 66)' },
  { borderColor: 'rgb(30, 34, 69)', backgroundColor: 'rgb(30, 34, 69)' },
  { borderColor: 'rgb(0, 0, 0)', backgroundColor: 'rgb(0, 0, 0)' },
];

const ColorButtons = ({ onChangeColor }) => {
  return (
    <div className="flex flex-wrap w-40">
      {buttonStyles.map((style, index) => (
        <Button
          type="text"
          key={index}
          onClick={() => onChangeColor(style.backgroundColor)}
          style={{
            border: 'none',
            transition: 'none',
            padding: 'unset',
            width: '24px',
            height: '24px',
          }}
          className=" flex mb-2 ml-0.5"
        >
          <div
            style={{ backgroundColor: style.backgroundColor, margin: 'auto' }}
            className="rounded-full w-[18px] h-[18px]"
          />
        </Button>
      ))}
    </div>
  );
};

export default ColorButtons;
