import type React from 'react';
import { createContext, useContext, type ReactNode } from 'react';

// Definição da interface ImageContextProps
interface ImageContextProps {
  images: { [key: string]: string }; // Mapeamento de ID para URL da imagem
  getImageByTitle: (title: string) => string; // Função para obter URL da imagem por título
}

// Criação do contexto com um valor inicial indefinido
const ImageContext = createContext<ImageContextProps | undefined>(undefined);

// Componente Provider para o contexto de imagens
export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images: { [key: string]: string } = {
    "Hamburguer tuneza simples de carne": '/menu/burguer_1.png',
    "Menu papa tudo": '/menu/burguer_1.png',
    "Fahitas de carne": '/menu/burguer_1.png'
    // Adicione outras associações título -> imagem conforme necessário
  };

  const getImageByTitle = (title: string): string => {
    return images[title] || '/menu/default.png';
  };

  return (
    <ImageContext.Provider value={{ images, getImageByTitle }}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useImage = (): ImageContextProps => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
