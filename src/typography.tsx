// setting up colors for the project as per FIGMA design

interface FontFamily {
  font_1: string;
  font_2: string;
}

interface FontSize {
  size_1: string;
  size_2: string;
  size_3: string;
  size_4: string;
}

interface FontWeight {
  weight_1: number;
  weight_2: number;
  weight_3: number;
  weight_4: number;
}

const fontFamily: FontFamily = {
  font_1: 'Inter',
  font_2: 'Poppins',
};

const fontSize: FontSize = {
  size_1: '40px',
  size_2: '20px',
  size_3: '16px',
  size_4: '14px',
};

const fontWeight: FontWeight = {
  weight_1: 600,
  weight_2: 500,
  weight_3: 400,
  weight_4: 300,
};

export { fontFamily, fontSize, fontWeight };
