import pokebase as pb
import json

#pokebase import is a python wraper with auto caching for
#using the pokeapi, part of their fair-use policy.

#data variable is a JSON formatted string containing
#all the tuples for pokemon,items, and moves.

def main():

    dataset = [] #initializing dataset

    for i in range(1, 899): #iterate through 899 number of pokemon
        poke = pb.pokemon(i)
        types = []
        for type_slot in poke.types: #reformat for multiple types
            types.append(type_slot.type.name.title())

        dataset.append(
            {   'id': i,
                'name': poke.name,
                'types': types,
                poke.stats[0].stat.name: poke.stats[0].base_stat,
                poke.stats[1].stat.name: poke.stats[1].base_stat,
                poke.stats[2].stat.name: poke.stats[2].base_stat,
                poke.stats[3].stat.name: poke.stats[3].base_stat,
                poke.stats[4].stat.name: poke.stats[4].base_stat,
                poke.stats[5].stat.name: poke.stats[5].base_stat,
                'source': poke.url,
            })
        temp = [i, poke.name, types]
        print(temp)
    with open('pokemon-library.json', 'w') as outfile: #push data to file
        # for data in dataset:
        json.dump(dataset, outfile, indent=3, ensure_ascii=False)

main()
