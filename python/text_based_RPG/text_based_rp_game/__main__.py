import time
from character_classes import Character, Player, Monster
from combat import Combat
from string_constants import (
    PLAYER_REWARD,
    PLAYER_WINS,
    PLAYER_DEFEATED,
    PLAYER_STATS,
    PLAYER_LEVEL_UP,
    GAME_TITLE,
    QUESTION_ARE_YOU_READY,
    QUESTION_OPEN_DOOR,
    TRAP_ROOM,
    COMBAT_DIVIDER,
    POTION_ROOM,
    SUCCESFUL_ATTACK,
    FAILED_ATTACK,
    INSTRUCTIONS,
)
from random import choices, randrange
from colorama import Fore


def print_coloured_text(colour, string):
    print(colour + string)
    print(Fore.RESET)


def introduction():
    print_coloured_text(Fore.YELLOW, GAME_TITLE)
    print("A text based dungeon adventure game")
    print(INSTRUCTIONS)


def setup_player():
    print_coloured_text(Fore.BLUE, "\nWhat is thy name?")
    player = Player(
        name=input(), stats={"attack": 2, "defend": 2, "dmg": 2}, health=10, level=1,
    )
    return player


def main():
    introduction()
    player = setup_player()

    print_coloured_text(
        Fore.BLUE, f"\n{player.get_name()} {QUESTION_ARE_YOU_READY}",
    )

    while input() == "y":
        print("\nYou open the door and......")
        time.sleep(1)
        action = choices([encounter, trap, potion], [0.8, 0.1, 0.1], k=1).pop()
        print(action(player))

        if player.is_dead():
            break

        if player.should_level_up():
            print(PLAYER_LEVEL_UP.format(player.get_name(), player.get_level()))

        if player.has_won():
            print("You have found the artifact! Congratulations, you have won!")
            break

        time.sleep(1)
        print(
            PLAYER_STATS.format(
                player.get_health(), player.get_xp(), player.get_level()
            )
        )
        print_coloured_text(Fore.BLUE, QUESTION_OPEN_DOOR)

    print("\nGame Over!")


def trap(player):
    player.decrease_health(1)
    return TRAP_ROOM


def potion(player):
    player.gain_health(2)
    return POTION_ROOM


def encounter(player):
    monster = Monster(player.get_level())
    monster_name = monster.get_name()
    player_name = player.get_name()

    print(f"\nfind... a {monster_name}! The {monster_name} attacks you!")
    time.sleep(1)

    combat_turns = Combat(players=[player, monster])
    combat_turns.randomise_first_turn()

    print_coloured_text(Fore.YELLOW, COMBAT_DIVIDER)

    while not monster.is_dead() and not player.is_dead():

        atk, defnd = combat_turns.get_current_turn()
        amount_of_damage = atk.attack(defnd.get_defense_rating())

        if amount_of_damage:
            defnd.decrease_health(amount_of_damage)
            print(
                atk.colour
                + SUCCESFUL_ATTACK.format(atk.get_name(), defnd.get_name(), amount_of_damage)
            )
        else:
            print(defnd.colour + FAILED_ATTACK.format(atk.get_name(), defnd.get_name()))

        print(Fore.RESET)
        combat_turns.swap_sides()
        time.sleep(2)

    print_coloured_text(Fore.YELLOW, COMBAT_DIVIDER)

    if not player.is_dead():
        player.set_xp(monster.get_xp())

        print(PLAYER_WINS.format(player_name, monster_name))
        time.sleep(1)

        return PLAYER_REWARD.format(player_name, monster.get_xp(), player.get_health())

    else:
        return PLAYER_DEFEATED.format(player_name, monster_name)

if __name__ == "__main__":
    main()
