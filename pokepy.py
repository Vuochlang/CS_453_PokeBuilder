import pokebase as pb
import json

#pokebase import is a python wraper with auto caching for
#using the pokeapi, part of their fair-use policy.

#data variable is a JSON formatted string containing
#all the tuples for pokemon,items, and moves.

def main():

    data = {} #initializing data
    data['Pokemon'] = []

    for i in range(1, 899): #iterate through number of pokemon
        poke = pb.pokemon(i)
        types = ''
        for type_slot in poke.types: #reformat for multiple types
            types = types + type_slot.type.name.title() + ','

        types = types.rstrip(',')
        #append pokemon name,types,stats and source to list.
        data['Pokemon'].append({'ID': i,
                                'Name': poke.name,
                                'types': types,
                                poke.stats[0].stat.name: poke.stats[0].base_stat,
                                poke.stats[1].stat.name: poke.stats[1].base_stat,
                                poke.stats[2].stat.name: poke.stats[2].base_stat,
                                poke.stats[3].stat.name: poke.stats[3].base_stat,
                                poke.stats[4].stat.name: poke.stats[4].base_stat,
                                poke.stats[5].stat.name: poke.stats[5].base_stat,
                                'Source': poke.url,
                                })
        temp = [i, poke.name, types]
        print(temp)
    with open('data.json', 'w') as outfile: #push data to file "data.txt"
        json.dump(data, outfile, indent=3, ensure_ascii=False)

main()
