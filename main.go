package main

import (
	"log"

	"github.com/bwmarrin/discordgo"
	"github.com/spf13/viper"
)

func main() {
	v, err := InitConfig()
	if err != nil {
		log.Fatal(err)
	}
	token := v.GetString("discordbot.token")
	discord, err := discordgo.New("Bot " + token)
	_ = discord
}

func InitConfig() (*viper.Viper, error) {
	v := viper.New()
	v.AddConfigPath("./")
	v.SetConfigType("toml")
	v.SetConfigName("config.toml")

	if err := v.ReadInConfig(); err == nil {
		log.Printf("use config file -> %s\n", v.ConfigFileUsed())
	} else {
		return nil, err
	}
	return v, nil
}
