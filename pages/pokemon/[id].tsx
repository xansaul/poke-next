import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { PokemonView } from '@/components/pokemon';


interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props>  = ({ pokemon }) => {

  return (
    <PokemonView pokemon={pokemon} />
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const pokemons151 = [...Array(151)].map((value,index)=>`${index+1}`);

  return {
    paths: pokemons151.map((id)=>({
      params: {id}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}/`);
  return {
    props: {
      pokemon: data
    }
  };
};

export default  PokemonPage  