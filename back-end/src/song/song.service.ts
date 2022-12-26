import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SongDto } from './song.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SongService {

    constructor(private configService: ConfigService) {
    }
    async search(query: string): Promise<SongDto[]> {
        const accessToken = await this.authenticate();

        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        };
        return axios
            .get(
                'https://api.spotify.com/v1/search?q=' +
                query +
                '&type=track&limit=5',
                {
                    headers: headers,
                },
            )
            .then(({ data }) => {
                return data.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        title: track.name,
                        artist: track.artists[0].name,
                        previewUrl: track.preview_url,
                    };
                });
            });
    }

    private async authenticate(): Promise<string> {
        const client_id = this.configService.get<string>('SPOTIFY_CLIENT_ID');
        const client_secret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');

        if (client_id === 'your Spotify client id') {
            throw new Error(
                'The Spotify client id has not been configured. Please provide the env variable SPOTIFY_CLIENT_ID',
            );
        }

        if (client_secret === 'your Spotify secret') {
            throw new Error(
                'The Spotify secret has not been configured. Please provide the env variable SPOTIFY_CLIENT_SECRET',
            );
        }

        const formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');

        const headers = {
            Authorization:
                'Basic ' +
                new Buffer(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        return axios
            .post('https://accounts.spotify.com/api/token', formData, {
                headers: headers,
            })
            .then(({ data }) => {
                return data.access_token;
            });
    }

    async findById(id: string) {
        const accessToken = await this.authenticate();

        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        };
        return axios
            .get('https://api.spotify.com/v1/tracks/' + id, {
                headers: headers,
            })
            .then(({ data }) => {
                return {
                    id: data.id,
                    title: data.name,
                    artist: data.artists[0].name,
                    previewUrl: data.preview_url,
                };
            });
    }
}
