from random import randrange, choice
from colorama import Fore


class Character:

    xp = 0

    def __init__(self, name, stats, health, level):
        self.name = name
        self.stats = stats
        self.health = health
        self.level = level

    def dice_roll(self):
        return randrange(1, 7)

    def attack(self, opponentsDefence):
        if self.dice_roll() + self.stats["attack"] >= opponentsDefence:
            return self.stats["dmg"]

    def get_name(self):
        return self.name

    def get_level(self):
        return self.level

    def get_health(self):
        return self.health

    def gain_health(self, amount):
        self.health += amount
        return self.health

    def decrease_health(self, amount):
        self.health -= amount
        return self.health

    def get_defense_rating(self):
        return self.stats["defend"]

    def is_dead(self):
        return self.health <= 0

    def get_xp(self):
        return self.xp


class Player(Character):

    colour = Fore.GREEN

    def set_xp(self, amount):
        self.xp += amount

    def should_level_up(self):
        if self.xp > (self.get_level() * 3) + 10 and not self.xp == 0:
            self.level_up()
            return True
        else:
            return False

    def level_up(self):
        for i in self.stats:
            self.stats[i] += 1
        self.gain_health(10)
        self.level += 1
        self.xp = 0

    def has_won(self):
        return self.get_level() > 4 and randrange(1, 5) >= 4


class Monster(Character):

    colour = Fore.RED

    def __init__(self, level):
        self.name = choice(
            [
                "Goblin",
                "Ghost",
                "Cyclops",
                "Skeleton",
                "Zombie",
                "Grumpy Hedgehog",
                "Very Angry Goose",
                "Troll",
            ]
        )
        self.stats = {
            "attack": randrange(1, level + 4),
            "defend": randrange(1, level + 3),
            "dmg": randrange(1, level + 1),
        }
        self.level = level
        self.health = randrange(1, self.level + 1)
        self.xp = randrange(1, randrange(2, level + 5))
