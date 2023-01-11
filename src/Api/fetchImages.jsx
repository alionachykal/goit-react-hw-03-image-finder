import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, pageNr = 1) => {
  try {
    const { data } = await axios.get(
      `/?q=${inputValue}&page=${pageNr}&key=29588079-fbc492831fdad231bf7222b96&image_type=photo&orientation=horizontal&per_page=12`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

