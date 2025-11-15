package types

type User struct {
	Email             string   `json:"email"`
	Admin             bool     `json:"admin"`
	ProfilePictureUrl string   `json:"profilePictureUrl"`
	FavouriteChords   []string `json:"favouriteChords"`
	LearnedChords     []string `json:"learnedChords"`
}
