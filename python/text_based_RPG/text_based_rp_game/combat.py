from random import sample

class Combat:
    def __init__(self, players):
        self.players = players

    def swap_sides(self):
        self.players.reverse()

    def randomise_first_turn(self):
        self.players = sample(set(self.players), 2)

    def get_current_turn(self):
        return self.players


