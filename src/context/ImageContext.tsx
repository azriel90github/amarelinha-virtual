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
    "Hambúrguer tuneza simples de Carne": '/menu/burguer_5.png',
    "Hambúrguer tuneza simples de Frango": '/menu/burguer_5.png',
    "Menu tuneza de Carne": '/menu/burguer_5.png',
    "Menu tuneza de Frango": '/menu/burguer_5.png',
    "Papa tudo": '/menu/burguer_5.png',
    "Menu Papa tudo": '/menu/burguer_5.png',
    "Batata frita": '/menu/burguer_5.png',
    "Pote de Molhos ( cada )": '/menu/burguer_5.png',
    "Ovo": '/menu/burguer_5.png',

    "Coca Cola": '/menu/burguer_5.png',
    "Fanta": '/menu/burguer_5.png',
    "Sprite": '/menu/burguer_5.png',
    "Pepsi": '/menu/burguer_5.png',
    "Mirinda": '/menu/burguer_5.png',
    "Água Pura": '/menu/burguer_5.png',

    "Fahita de Carne": '/menu/burguer_5.png',
    "Fahita de Frango": '/menu/burguer_5.png',
    "Fahita Mista": '/menu/burguer_5.png',
    
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
