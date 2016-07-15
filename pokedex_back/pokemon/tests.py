from django.test import TestCase
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Pokemon
from .serializers import PokemonSerializer


class CreatePokemonTest(APITestCase):
    def setUp(self):
        self.data = {'name': 'PokemonNameTest',
                     'type': 'Human',
                     'ability': 'Sing',
                     'weight': 12.1,
                     'height': 120.0,
                     'description': 'Christ description'}

    def test_can_create_pokemon(self):
        response = self.client.post(reverse('pokemons-list'), self.data)
        self.assertEqual(Pokemon.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ReadPokemonTest(APITestCase):
    def setUp(self):
        self.pokemon = Pokemon.objects.create(name="mike",
                                              type="Tyson",
                                              ability="Sing",
                                              weight=12.1,
                                              height=120.0,
                                              description="Christ description")

    def test_can_read_pokemon_list(self):
        response = self.client.get(reverse('pokemons-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_pokemon_detail(self):
        response = self.client.get(reverse('pokemons-detail', args=[self.pokemon.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UpdatePokemonTest(APITestCase):
    def setUp(self):
        self.pokemon = Pokemon.objects.create(name="mike",
                                              type="Tyson",
                                              ability="Sing",
                                              weight=12.1,
                                              height=120.0,
                                              description="Christ description")
        self.data = PokemonSerializer(self.pokemon).data
        self.data.update({'name': 'Changed'})

    def test_can_update_pokemon(self):
        response = self.client.put(reverse('pokemons-detail', args=[self.pokemon.id]), self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeletePokemonTest(APITestCase):
    def setUp(self):
        self.pokemon = Pokemon.objects.create(name="mike",
                                              type="Tyson",
                                              ability="Sing",
                                              weight=12.1,
                                              height=120.0,
                                              description="Christ description")

    def test_can_delete_pokemon(self):
        response = self.client.delete(reverse('pokemons-detail', args=[self.pokemon.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

