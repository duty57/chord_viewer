package types

type User struct {
	Email           string   `json:"email"`
	Admin           bool     `json:"admin"`
	FavouriteChords []string `json:"favouriteChords"`
	LearnedChords   []string `json:"learnedChords"`
}
